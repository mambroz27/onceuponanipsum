<script lang="ts">
  import { onMount } from "svelte";
  import lightModeIcon from "../../assets/icons/light-mode.svg?raw";
  import darkModeIcon from "../../assets/icons/dark-mode.svg?raw";

  let systemTheme: "light" | "dark" | null = null;
  let userTheme: "light" | "dark" | null = null;
  let activeTheme: "light" | "dark" | null = null;

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
    ? 'opacity-0 pointer-events-none'
    : ''} scale-75 h-6 w-6 child:!fill-light-link child-hover:fill-light-linkHover text-[24px] leading-[24px] flex items-center justify-center dark:child:!fill-dark-link dark:child-hover:!fill-dark-linkHover child:transition-colors child:duration-300"
  on:click={toggleTheme}
>
  {@html activeTheme === "light" ? darkModeIcon : lightModeIcon}
</button>
