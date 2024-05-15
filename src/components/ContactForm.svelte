<script lang="ts">
  //@ts-ignore
  import kwesforms from 'kwesforms';
  import { onMount } from 'svelte';

  onMount(() => {
    kwesforms.init();
  });
</script>

<form
  method="POST"
  action="https://kwesforms.com/api/f/Xd4ukhtpVkvFPL0k96h5"
  class="kf-form grid gap-y-2"
>
  <label for="comment" class="text-zinc-900 text-2xl mb-2 mt-10"
    >Whats on your mind?</label
  >
  <textarea
    name="comment"
    id="comment"
    rows="3"
    class="border border-teal-900 rounded-lg px-6 py-6"
    rules="required|max:255"
  />
  <button
    type="submit"
    class="text-2xl text-zinc-100 bg-teal-900 px-6 py-5 rounded-xl my-1"
    >Send</button
  >
</form>
