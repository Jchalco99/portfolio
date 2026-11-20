let introPlayedInSession = false;

/** Returns whether the opening intro animation has already played in this SPA session. */
export function hasIntroPlayedInSession(): boolean {
  return introPlayedInSession;
}

/** Marks the opening intro animation as played so locale/route transitions stay instant. */
export function markIntroPlayedInSession(): void {
  introPlayedInSession = true;
}
