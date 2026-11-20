import { Peer, type DataConnection } from 'peerjs';
import { getCharacter, type MarvelCharacter } from '../data/characters';
import { allItems } from '../data/tracks';
import { getState } from './store';
import type { Progress } from '../data/types';

const P1_CHAR_KEY = 'op-doomsday:p1-character';
const P2_CHAR_KEY = 'op-doomsday:p2-character';
const COOP_ENABLED_KEY = 'op-doomsday:coop-enabled';

interface CoopState {
  enabled: boolean;
  p1CharId: string;
  p2CharId: string;
  p2Progress: Record<string, Progress>;
  p2Connected: boolean;
  roomId: string | null;
  isHost: boolean;
}

let activeConnection: DataConnection | null = null;
let peerInstance: Peer | null = null;
let onSyncCallback: (() => void) | null = null;

export const coopState: CoopState = {
  enabled: localStorage.getItem(COOP_ENABLED_KEY) === 'true',
  p1CharId: localStorage.getItem(P1_CHAR_KEY) || 'iron-man',
  p2CharId: localStorage.getItem(P2_CHAR_KEY) || 'captain-america',
  p2Progress: {},
  p2Connected: false,
  roomId: null,
  isHost: false,
};

export function setOnSyncCallback(cb: () => void): void {
  onSyncCallback = cb;
}

export function setP1Character(charId: string): void {
  coopState.p1CharId = charId;
  localStorage.setItem(P1_CHAR_KEY, charId);
  broadcastSync();
}

export function setP2Character(charId: string): void {
  coopState.p2CharId = charId;
  localStorage.setItem(P2_CHAR_KEY, charId);
  broadcastSync();
}

export function setCoopEnabled(enabled: boolean): void {
  coopState.enabled = enabled;
  localStorage.setItem(COOP_ENABLED_KEY, String(enabled));
}

export function getP1Character(): MarvelCharacter {
  return getCharacter(coopState.p1CharId);
}

export function getP2Character(): MarvelCharacter {
  return getCharacter(coopState.p2CharId);
}

// ─── Current Position Calculator ────────────────────────────

export function getPlayerPosition(progressMap?: Record<string, Progress>): {
  item: typeof allItems[0];
  index: number;
} {
  const map = progressMap || getState().progress;
  const pendingIndex = allItems.findIndex((it) => (map[it.id]?.status || 'pending') === 'pending');
  const activeIndex = pendingIndex === -1 ? allItems.length - 1 : pendingIndex;
  return {
    item: allItems[activeIndex] || allItems[0],
    index: activeIndex,
  };
}

// ─── P2P Synchronization (PeerJS) ──────────────────────────

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function createCoopRoom(roomCode: string, onReady?: (code: string) => void): void {
  cleanupPeer();
  coopState.enabled = true;
  coopState.isHost = true;
  coopState.roomId = roomCode;
  setCoopEnabled(true);

  const peerId = `opdoomsday-${roomCode.toLowerCase()}`;
  peerInstance = new Peer(peerId);

  peerInstance.on('open', () => {
    onReady?.(roomCode);
  });

  peerInstance.on('connection', (conn) => {
    activeConnection = conn;
    setupConnectionHandlers(conn);
  });

  peerInstance.on('error', () => {
    coopState.p2Connected = false;
  });
}

export function joinCoopRoom(roomCode: string, onSuccess?: () => void, onError?: () => void): void {
  cleanupPeer();
  coopState.enabled = true;
  coopState.isHost = false;
  coopState.roomId = roomCode.toUpperCase();
  setCoopEnabled(true);

  peerInstance = new Peer();

  peerInstance.on('open', () => {
    const targetPeerId = `opdoomsday-${roomCode.toLowerCase()}`;
    const conn = peerInstance!.connect(targetPeerId);
    activeConnection = conn;
    setupConnectionHandlers(conn);

    conn.on('open', () => {
      onSuccess?.();
    });
  });

  peerInstance.on('error', () => {
    onError?.();
  });
}

function setupConnectionHandlers(conn: DataConnection): void {
  conn.on('open', () => {
    coopState.p2Connected = true;
    // Send local state to remote peer
    broadcastSync();
    onSyncCallback?.();
  });

  conn.on('data', (data: any) => {
    if (data && data.type === 'SYNC') {
      coopState.p2CharId = data.characterId || coopState.p2CharId;
      coopState.p2Progress = data.progress || {};
      coopState.p2Connected = true;
      onSyncCallback?.();
    }
  });

  conn.on('close', () => {
    coopState.p2Connected = false;
    onSyncCallback?.();
  });
}

export function broadcastSync(): void {
  if (activeConnection && activeConnection.open) {
    activeConnection.send({
      type: 'SYNC',
      characterId: coopState.p1CharId,
      progress: getState().progress,
    });
  }
}

export function cleanupPeer(): void {
  if (activeConnection) {
    activeConnection.close();
    activeConnection = null;
  }
  if (peerInstance) {
    peerInstance.destroy();
    peerInstance = null;
  }
  coopState.p2Connected = false;
}
