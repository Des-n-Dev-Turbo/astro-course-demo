<script lang="ts">
  import { Emoji, emojiList, type ReactionsDetail } from '../types/Emoji';
  import EmojiReaction from './EmojiReaction.svelte';

  export let post: string;
  export let reactionsDetail: ReactionsDetail;
</script>

<div class="flex justify-center items-center gap-x-2 h-8">
  {#each emojiList as emoji}
    <EmojiReaction
      {emoji}
      {post}
      reacted={reactionsDetail[emoji].reacted}
      count={reactionsDetail[emoji].count}
    />
  {/each}
</div>
