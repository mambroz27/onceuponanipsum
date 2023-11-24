<script lang="ts">
  import { onMount } from "svelte";
  import lightModeIcon from "../../assets/icons/light-mode.svg?raw";
  import darkModeIcon from "../../assets/icons/dark-mode.svg?raw";

  let systemTheme: "light" | "dark" | null = null;
  let userTheme: "light" | "dark" | null = null;
  let activeTheme: "light" | "dark" | null = null;

  const styles =
    "styled-link border-box flex items-center justify-center p-2 cursor-pointer transition-all duration-300 ease-out will-change-transform child:!fill-light-link child:dark:!fill-dark-link rounded-full border-2 border-transparent hover:border-light-textMuted/10 dark:hover:border-dark-textMuted/10 bg-transparent hover:bg-light-textMuted/5 dark:hover:bg-dark-textMuted/5 text-lg leading-[18px] h-12 w-12 child:scale-75";

  onMount(() => {
    // Get the saved theme preference
    userTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    // Get the system preference
    systemTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    // If we have a saved theme, use it. Otherwise, use the system preference
    activeTheme = userTheme ?? systemTheme ?? "dark";

    // Watch for changes to the system preference
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newColorScheme = event.matches ? "dark" : "light";

        // Update system preference
        systemTheme = newColorScheme;

        // If the user hasn't saved a theme, update the active theme
        if (!userTheme) {
          activeTheme = systemTheme;
          updateRootClass();
        }
      });
  });

  /**
   * Toggle the active theme class
   */
  function updateRootClass() {
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme() {
    activeTheme = activeTheme === "light" ? "dark" : "light";

    if (systemTheme !== activeTheme) {
      // Save explicit setting to local storage
      localStorage.setItem("theme", activeTheme);
    } else {
      // Remove saved preference if it matches system default
      localStorage.removeItem("theme");
    }

    updateRootClass();
  }
</script>

<button
  class="{activeTheme === null
    ? 'opacity-60 pointer-events-none'
    : 'opacity-100'} {styles}"
  on:click={toggleTheme}
>
  {@html activeTheme === "light" ? darkModeIcon : lightModeIcon}
</button>
