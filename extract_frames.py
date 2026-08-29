import os
import urllib.parse
from PIL import Image

def get_frame():
    try:
        import cv2
    except ImportError:
        os.system('pip install opencv-python-headless')
        import cv2

    base_dir = "f:/AntiGravity/Apps Data/Website Portfolio Work/Photos & to upload"
    videos = [
        "Nature/All Work (1).mp4",
        "Nature/All Work (8).mp4",
        "Nature/All Work (12).mp4"
    ]

    for vid in videos:
        vid_path = os.path.join(base_dir, vid)
        if os.path.exists(vid_path):
            cap = cv2.VideoCapture(vid_path)
            ret, frame = cap.read()
            if ret:
                out_path = vid_path.replace(".mp4", "_screenshot.jpg")
                cv2.imwrite(out_path, frame)
                print(f"Saved {out_path}")
            cap.release()
        else:
            print(f"Not found: {vid_path}")

get_frame()
