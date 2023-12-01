export type ShareType = "facebook" | "reddit" | "linkedin" | "email";

export function getShareUrl(
  shareType: ShareType,
  shareUrl: string,
  shareTitle: string
) {
  const endcodedShareUrl = encodeURIComponent(shareUrl);
  const encodedShareTitle = encodeURIComponent(shareTitle);

  let url = "";

  switch (shareType) {
    case "facebook":
      url = `https://www.facebook.com/sharer/sharer.php?u=${endcodedShareUrl}`;
      break;
    case "reddit":
      url = `https://www.reddit.com/submit?url=${endcodedShareUrl}&title=${encodedShareTitle}`;
      break;
    case "linkedin":
      url = `https://www.linkedin.com/shareArticle?mini=true&url=${endcodedShareUrl}&title=${encodedShareTitle}`;
      break;
    case "email":
      url = `mailto:?subject=${encodedShareTitle}&body=${endcodedShareUrl}`;
      break;
    default:
      throw new Error("Invalid share type");
  }

  return url;
}
