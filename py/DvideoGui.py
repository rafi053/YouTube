import yt_dlp
import os
import tkinter as tk
from tkinter import messagebox, filedialog

class YouTubeDownloaderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("YouTube Downloader")
        self.root.geometry("500x300")
        self.root.resizable(False, False)

        # Title
        self.title_label = tk.Label(root, text="YouTube Downloader", font=("Arial", 16, "bold"))
        self.title_label.pack(pady=10)

        # Input field for URL
        self.url_label = tk.Label(root, text="Enter YouTube URL:")
        self.url_label.pack(pady=5)

        self.url_frame = tk.Frame(root)
        self.url_frame.pack(pady=5)

        self.url_entry = tk.Entry(self.url_frame, width=40)
        self.url_entry.pack(side=tk.LEFT, padx=5)

        # Paste button (manually activating paste)
        self.paste_button = tk.Button(self.url_frame, text="📋", command=self.paste_clipboard, font=("Arial", 12))
        self.paste_button.pack(side=tk.LEFT)

        # Download button
        self.download_button = tk.Button(root, text="Download", command=self.start_download, bg="#4CAF50", fg="white", font=("Arial", 12))
        self.download_button.pack(pady=10)

        # Status label
        self.status_label = tk.Label(root, text="", font=("Arial", 12), fg="blue")
        self.status_label.pack(pady=5)

        # Bind Ctrl+V for pasting text manually
        self.url_entry.bind('<Control-v>', self.handle_paste_event)

        # Set focus on the URL entry field when the window is loaded
        self.url_entry.focus()

    def handle_paste_event(self, event=None):
        """Handle the paste event triggered by Ctrl+V."""
        # Perform the default paste action manually
        clipboard_text = self.root.clipboard_get()
        self.url_entry.delete(0, tk.END)  # Clear existing text
        self.url_entry.insert(0, clipboard_text)  # Paste clipboard text
        return "break"  # Prevent default pasting behavior

    def paste_clipboard(self):
        """Paste text from the clipboard into the URL entry field."""
        try:
            clipboard_text = self.root.clipboard_get()
            print("Clipboard content:", clipboard_text)  # Print clipboard content
            self.url_entry.delete(0, tk.END)  # Clear existing text
            self.url_entry.insert(0, clipboard_text)  # Paste clipboard text
        except tk.TclError:
            messagebox.showerror("Error", "Clipboard is empty!")

    def start_download(self):
        """Start the download process."""
        url = self.url_entry.get()
        if not url.strip():
            messagebox.showwarning("Warning", "Please enter a valid YouTube URL!")
            return

        save_path = filedialog.askdirectory(title="Select Folder to Save Video")
        if not save_path:
            messagebox.showwarning("Warning", "No folder selected. Download canceled.")
            return

        self.status_label.config(text="Downloading...", fg="orange")
        self.root.update_idletasks()

        try:
            self.download_video(url, save_path)
            self.status_label.config(text="Download completed successfully!", fg="green")
            self.url_entry.delete(0, tk.END)  # Clear the URL field after download
        except Exception as e:
            self.status_label.config(text=f"Error: {e}", fg="red")

    def download_video(self, url, save_path):
        """Download video using yt-dlp."""
        ydl_opts = {
            'format': 'bestvideo+bestaudio/best',
            'outtmpl': os.path.join(save_path, '%(title)s.%(ext)s'),
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

if __name__ == "__main__":
    root = tk.Tk()
    app = YouTubeDownloaderApp(root)
    root.mainloop()
