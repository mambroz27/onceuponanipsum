<script lang="ts">
  import { onMount } from "svelte";
  import swatchBookIcon from "../../assets/icons/swatch-book.svg?raw";
  import darkModeIcon from "../../assets/icons/dark-mode.svg?raw";
  import darkModeFilledIcon from "../../assets/icons/dark-mode-filled.svg?raw";
  import lightModeIcon from "../../assets/icons/light-mode.svg?raw";
  import lightModeFilledIcon from "../../assets/icons/light-mode-filled.svg?raw";
  import deviceModeIcon from "../../assets/icons/device-mode.svg?raw";
  import deviceModeFilledIcon from "../../assets/icons/device-mode-filled.svg?raw";

  let systemTheme: "light" | "dark" | null = null;
  let userTheme: "light" | "dark" | "system" | null = null;
  let activeTheme: "light" | "dark" | "system" = "dark";

  let showMenu = false;

  const buttonBaseStyles =
    "border-box text-lg flex items-center px-4 gap-2 cursor-pointer transition-all duration-300 ease-out rounded-3xl bg-transparent hover:bg-light-textMuted/5 dark:hover:bg-dark-textMuted/5 h-12";
  const buttonInactiveStyles =
    buttonBaseStyles +
    " text-light-link dark:text-dark-link child:!fill-light-link child:dark:!fill-dark-link";
  const buttonActiveStyles =
    buttonBaseStyles +
    " text-light-linkHover dark:text-dark-linkHover child:!fill-light-linkHover child:dark:!fill-dark-linkHover";

  onMount(() => {
    // Get the saved theme preference
    userTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;

    // Get the system preference
    systemTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    // If we have a saved theme, use it. Otherwise, default to dark
    activeTheme = userTheme === "system" ? systemTheme : userTheme || "dark";

    // Watch for changes to the system preference
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", syncSystemTheme);

    // Update the root class
    updateRootClass();

    // Clean up the event listener
    return () => mediaQueryList.removeEventListener("change", syncSystemTheme);
  });

  /**
   * Sync System Theme
   */
  function syncSystemTheme(event: MediaQueryListEvent): void {
    const newColorScheme = event.matches ? "dark" : "light";

    // Update system preference
    systemTheme = newColorScheme;

    if (userTheme === "system") {
      // If we're using the system preference, update the active theme
      changeTheme("system");
    }
  }

  /**
   * Open the menu
   * Adds event listener to close the menu when clicking outside
   */
  function handleMenuOpen(): void {
    showMenu = true;
    document.body.addEventListener("click", handleMenuClose);
  }

  /**
   * Close the menu
   * Removes event listener to close the menu when clicking outside
   */
  function handleMenuClose(): void {
    showMenu = false;
    document.body.removeEventListener("click", handleMenuClose);
  }

  /**
   * Toggle the active theme class
   */
  function updateRootClass(): void {
    let requestedTheme =
      activeTheme === "system" ? systemTheme || "dark" : activeTheme;

    if (requestedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  /**
   * Change the active theme
   */
  function changeTheme(theme: "light" | "dark" | "system"): void {
    activeTheme = theme;

    updateRootClass();

    if (activeTheme === "dark") {
      // Remove saved preference if it matches the default
      localStorage.removeItem("theme");
    } else {
      // Save explicit setting to local storage
      localStorage.setItem("theme", activeTheme);
    }
  }
</script>

<div class="relative">
  <button
    class="styled-link border-box flex items-center justify-center p-2 cursor-pointer transition-all duration-300 ease-out child:!fill-light-link child:dark:!fill-dark-link rounded-3xl border-2 border-transparent hover:border-light-textMuted/10 dark:hover:border-dark-textMuted/10 bg-transparent hover:bg-light-textMuted/5 dark:hover:bg-dark-textMuted/5 text-lg leading-[18px] h-12 w-12"
    on:click|stopPropagation={handleMenuOpen}
  >
    {@html swatchBookIcon}
  </button>

  {#if showMenu}
    <div
      class="border-box overflow-hidden absolute top-0 right-0 md:right-auto md:left-0 rounded-3xl border-2 border-light-textMuted/10 dark:border-dark-textMuted/10 bg-light-bg dark:bg-dark-bg shadow-lg z-10 flex flex-col"
    >
      <button
        class={activeTheme === "dark"
          ? buttonActiveStyles
          : buttonInactiveStyles}
        on:click={() => changeTheme("dark")}
      >
        <span>
          {@html activeTheme === "dark" ? darkModeFilledIcon : darkModeIcon}
        </span>
        <span>Dark</span>
      </button>
      <button
        class={activeTheme === "light"
          ? buttonActiveStyles
          : buttonInactiveStyles}
        on:click={() => changeTheme("light")}
      >
        <span>
          {@html activeTheme === "light" ? lightModeFilledIcon : lightModeIcon}
        </span>
        <span>Light</span>
      </button>
      <button
        class={activeTheme === "system"
          ? buttonActiveStyles
          : buttonInactiveStyles}
        on:click={() => changeTheme("system")}
      >
        <span>
          {@html activeTheme === "system"
            ? deviceModeFilledIcon
            : deviceModeIcon}
        </span>
        <span>Device</span>
      </button>
    </div>
  {/if}
</div>
