/* Foldline — text diffing for the "your revision" side-by-side view.
 *
 * A presentation concern, not a scoring one: this never touches engine.js or
 * a platform config, so it needs no version bump and no benchmark change.
 * Pure JS, no DOM — testable directly with plain node.
 */
import { diffWordsWithSpace } from 'diff';

/**
 * Splits a word-level diff into the two columns a side-by-side view needs.
 *
 *   leftParts  — reconstructs oldText: unchanged spans + removed spans (struck).
 *   rightParts — reconstructs newText: unchanged spans + added spans (highlighted).
 *
 * Each part is { key, text, cls } where cls is '' | 'fl-del' | 'fl-add', ready
 * to map straight onto a <span>.
 */
export function buildDiffColumns(oldText, newText) {
    const a = oldText || '';
    const b = newText || '';

    if (a === b) {
        return {
            leftParts: a ? [{ key: 0, text: a, cls: '' }] : [],
            rightParts: b ? [{ key: 0, text: b, cls: '' }] : [],
            hasChanges: false,
        };
    }

    const parts = diffWordsWithSpace(a, b);
    const leftParts = [];
    const rightParts = [];
    let hasChanges = false;

    parts.forEach((p, i) => {
        if (p.added) {
            rightParts.push({ key: i, text: p.value, cls: 'fl-add' });
            hasChanges = true;
        } else if (p.removed) {
            leftParts.push({ key: i, text: p.value, cls: 'fl-del' });
            hasChanges = true;
        } else {
            leftParts.push({ key: i, text: p.value, cls: '' });
            rightParts.push({ key: i, text: p.value, cls: '' });
        }
    });

    return { leftParts, rightParts, hasChanges };
}
