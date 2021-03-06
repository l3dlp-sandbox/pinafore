import { removeEmoji } from '../_utils/removeEmoji'

export function getAccountAccessibleName (account, omitEmojiInDisplayNames) {
  let emojis = account.emojis
  let displayName = account.display_name || account.username
  if (omitEmojiInDisplayNames) {
    displayName = removeEmoji(displayName, emojis) || displayName
  }
  return displayName
}
