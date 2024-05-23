<script lang="ts">
  import Fa from 'svelte-fa';
  import { Emoji } from '../types/Emoji';
  import {
    faRocket,
    faThumbsUp,
    faHeart,
    faStar,
  } from '@fortawesome/free-solid-svg-icons';

  const nameToIcon = {
    thumbsup: faThumbsUp,
    rocket: faRocket,
    star: faStar,
    heart: faHeart,
  };

  export let emoji: Emoji;
  export let reacted: boolean;
  export let count: number;
  export let post: string;

  const handleEmojiReaction = async () => {
    try {
      const res = await fetch('/api/react', {
        method: 'POST',
        body: JSON.stringify({ emoji, post }),
      });

      if (res.ok) {
        if (reacted) {
          count--;
          reacted = false;
        } else {
          count++;
          reacted = true;
        }
      } else if (res.status === 401) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.log({ error });
    }
  };
</script>

<button
  class={`w-16 flex gap-x-1 justify-center items-center text-gray-500 cursor-pointer hover:scale-110 transition-transform ${reacted ? 'text-teal-700 border-2  border-teal-900 bg-teal-50 py-3 rounded-full' : ''}`}
  on:click={handleEmojiReaction}
>
  <Fa icon={nameToIcon[emoji]} />
  {#if count > 0}
    <span class="text-sm">{count}</span>
  {/if}
</button>
