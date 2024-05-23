export enum Emoji {
  thumbsup = 'thumbsup',
  star = 'star',
  heart = 'heart',
  rocket = 'rocket',
}

export const emojiList = Object.values(Emoji);

export interface ReactionDetail {
  count: number;
  reacted: boolean;
}

export interface ReactionsDetail {
  [Emoji.thumbsup]: ReactionDetail;
  [Emoji.star]: ReactionDetail;
  [Emoji.heart]: ReactionDetail;
  [Emoji.rocket]: ReactionDetail;
}
