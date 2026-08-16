import { ShipObstacle, ShipPlayer, ShipStage } from "@/types/lab";

export const PHYSICS_CONFIG = {
  gravity: 700, // px / s^2
  jumpImpulse: -270, // px / s
  speed: 150, // px / s
  minGap: 130, // px gap
  maxGap: 170, // px gap
  obstacleWidth: 54, // px
  minDistanceBetween: 210, // px
};

const OBSTACLE_LABELS = ["BUG", "ERROR", "TIMEOUT", "CONFLICT", "CRASH"];

export function calculateStage(score: number): ShipStage {
  if (score >= 10) return "production";
  if (score >= 5) return "staging";
  return "local";
}

export function updatePlayerPhysics(
  player: ShipPlayer,
  dt: number,
  boost: boolean
): ShipPlayer {
  // Clamp delta time to avoid large physics jumps on tab switch / lag spikes
  const safeDt = Math.min(dt, 0.05);

  let newVelocity = player.velocity;

  if (boost) {
    newVelocity = PHYSICS_CONFIG.jumpImpulse;
  } else {
    newVelocity += PHYSICS_CONFIG.gravity * safeDt;
  }

  const newY = player.y + newVelocity * safeDt;
  // Subtle rotation based on velocity: upward jump tilts -20deg, diving tilts +45deg
  const targetRotation = Math.max(
    -20,
    Math.min(45, (newVelocity / 300) * 45)
  );

  return {
    ...player,
    y: newY,
    velocity: newVelocity,
    rotation: targetRotation,
  };
}

export function checkShipCollision(
  player: ShipPlayer,
  obstacles: ShipObstacle[],
  canvasHeight: number
): boolean {
  const radius = player.size / 2;

  // Boundary checks (Top / Bottom)
  if (player.y - radius <= 0 || player.y + radius >= canvasHeight) {
    return true;
  }

  // Obstacle collision checks
  for (const obs of obstacles) {
    const obsLeft = obs.x;
    const obsRight = obs.x + obs.width;

    // Check horizontal overlap
    if (player.x + radius > obsLeft && player.x - radius < obsRight) {
      // Check top obstacle collision
      if (player.y - radius < obs.topHeight) {
        return true;
      }
      // Check bottom obstacle collision
      if (player.y + radius > canvasHeight - obs.bottomHeight) {
        return true;
      }
    }
  }

  return false;
}

export function generateObstacle(
  lastX: number,
  canvasWidth: number,
  canvasHeight: number,
  index: number
): ShipObstacle {
  const label = OBSTACLE_LABELS[index % OBSTACLE_LABELS.length];
  const gapSize = Math.floor(
    Math.random() * (PHYSICS_CONFIG.maxGap - PHYSICS_CONFIG.minGap + 1) +
      PHYSICS_CONFIG.minGap
  );

  // Safe vertical margin so gap is never outside reachable range
  const minTop = 60;
  const maxTop = canvasHeight - gapSize - 60;
  const topHeight = Math.floor(
    Math.random() * (maxTop - minTop + 1) + minTop
  );
  const bottomHeight = canvasHeight - topHeight - gapSize;

  const x = Math.max(
    canvasWidth + 50,
    lastX + PHYSICS_CONFIG.minDistanceBetween
  );

  return {
    id: `obs-${index}-${Date.now()}`,
    x,
    topHeight,
    bottomHeight,
    gapSize,
    width: PHYSICS_CONFIG.obstacleWidth,
    label,
    scored: false,
  };
}
