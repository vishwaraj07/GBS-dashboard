# GBS Awareness Dashboard

A public health awareness website-dashboard for Guillain-Barré Syndrome (GBS).
Built with plain HTML, CSS, and JavaScript — no installation or build tools required.

---

## How to Run the Website (Step-by-Step for Beginners)

### Option A: Open Directly (Simplest)

1. Download or copy all project files to a folder on your computer.
2. Make sure your folder looks like this:

3. Double-click `index.html`.
4. It will open in your web browser. The website is ready to use.

### Option B: Use VS Code Live Server (Recommended for Development)

1. Install [Visual Studio Code](https://code.visualstudio.com/) (free).
2. Open VS Code and install the "Live Server" extension (search in Extensions panel).
3. Open your project folder in VS Code (`File > Open Folder`).
4. Right-click `index.html` and choose "Open with Live Server".
5. The website opens in your browser and auto-refreshes when you edit files.

---

## Folder Structure
---

## How to Add or Replace Images

1. Copy your image files (`.jpg`, `.png`, or `.webp`) into the `images/` folder.
2. Name them: `image1.jpg`, `image2.jpg`, `image3.jpg`, etc.
3. Open `script.js` and find this section near the top:

```javascript
const imageFilenames = [
  'image1.jpg', 'image2.jpg', 'image3.jpg',
  ...
];
```

4. Update the filenames to match your actual image file names.
5. Save the file and refresh the browser. Your images will appear in the Media Gallery.

### How to add images to the Home Slider

The slider currently uses designed background gradients with text overlays. To replace them with real photos:

1. Open `index.html`.
2. Find the section `<!-- SLIDER -->`.
3. Inside each `<div class="slide-placeholder slide-pX">`, add an `<img>` tag or change the CSS background.
4. In `style.css`, find `.slide-p1`, `.slide-p2`, etc. and replace the `background: linear-gradient(...)` with:

```css
.slide-p1 {
  background-image: url('images/slide1.jpg');
  background-size: cover;
  background-position: center;
}
```

---

## How to Add New Sections

1. Open `index.html`.
2. Copy an existing `<section class="section" id="existing">` block.
3. Change the `id` to something new (e.g., `id="newsection"`).
4. Update the content inside.
5. Add a navigation button in the sidebar:

```html
<button class="nav-btn" data-section="newsection">New Section</button>
```

6. Save and refresh. The new section will appear in the sidebar and work automatically.

---

## How to Modify Text Content

- All content is inside `index.html`.
- Find the section you want to edit by searching for its heading (e.g., `<h1>Causes`).
- Edit the text directly in the HTML file.
- Save and refresh the browser.

---

## How to Add or Update Video Links

The Expert Corner section uses Google Drive video embeds.

1. Upload your video to Google Drive.
2. Right-click the video file and choose "Share". Set access to "Anyone with the link".
3. Copy the file ID from the share link. The link looks like:
   `https://drive.google.com/file/d/FILE_ID_HERE/view`
4. Open `index.html` and find the Expert Corner section.
5. Replace the `src` attribute of the `<iframe>` tag:

```html
<iframe src="https://drive.google.com/file/d/YOUR_FILE_ID_HERE/preview" ...>
```

Note: Use `/preview` at the end (not `/view`) for the video to play inside the page.

---

## How to Host for Free on GitHub Pages

1. Create a free account at [github.com](https://github.com).
2. Create a new repository (click the `+` button > "New repository").
3. Upload all your project files to the repository.
4. Go to the repository's **Settings** tab.
5. Scroll down to **Pages** (in the left sidebar).
6. Under "Source", select the `main` branch and click **Save**.
7. GitHub will give you a public URL like:
   `https://yourusername.github.io/repository-name/`

Your website is now live and accessible to anyone with the link.

---

## Sources

All medical content is based on:
- World Health Organization (WHO)
- Centers for Disease Control and Prevention (CDC)
- National Institutes of Health / NINDS
- Published research on the Pune 2025 GBS Outbreak