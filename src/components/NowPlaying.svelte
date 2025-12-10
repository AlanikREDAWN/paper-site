<style lang="postcss">
  @reference "tailwindcss";
  /* :global(html) {
    background-color: theme(--color-gray-100);
  } */
</style>

<script lang="ts">
    import "../styles/global.css";
    import { setOnSetGetEnv } from "astro/env/runtime";

    interface Player {
        isPlaying: boolean;
        songUrl?: string;
        title?: string;
        artist?: string;
    }
    let playerPromise: Promise<Player> = (async () => {
        try {
            const resp = await fetch(`/api/spotify.json`);
            if (!resp.ok) throw new Error('Fetch failed');
            const spotifyResponse = await resp.json();
            return {
                isPlaying: spotifyResponse.isPlaying,
                songUrl: spotifyResponse.songUrl,
                title: spotifyResponse.title,
                artist: spotifyResponse.artist
            };
        } catch (error) {
            return { isPlaying: false };
        }
    })();
</script>

{#await playerPromise then player}
    {#if player.isPlaying}
        <a class="now-playing font-handwriting text-5xl text-center flex justify-center text-amber-900" href={player.songUrl}>
            Now playing on spotify:<br>
            {player.title} - {player.artist}
        </a>
    {/if}
{/await}

<!-- <div class="text-sm w-fit text-gray-500 bg-gray-100 border-2 p-4 pl-5 py-2 rounded-lg">
    {#await playerPromise then player}
        {#if player.isPlaying}
            <div class="audio relative m-0 p-0 mr-1 top-0 inline bg-gray-500">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <span class="leading-0"><span class="font-semibold ml-4"><a href={player.songUrl} rel="noopener noreferrer" target="_blank" class="hover:underline">{player.title}</a></span> - {player.artist}</span>

        {:else}
            <svg class="inline h-4 w-4 top-0 -translate-y-[1.5px]" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000.svg"><path c></path></svg>
</div> -->

