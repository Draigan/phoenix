#!/bin/bash

# Directory containing the video files
video_dir="/home/dre/repos/son/assets/family_videos"

# Directory name for saving thumbnails
thumbnail_dir="thumbnails"

# Create the thumbnail directory if it doesn't exist
thumbnail_path="$video_dir/$thumbnail_dir"
mkdir -p "$thumbnail_path"

# Generate thumbnails for each video in the directory
for video in "$video_dir"/*.mp4; do
	video_name=$(basename "$video")
	video_name="${video_name%.*}"     # Video file name without extension
	thumbnail="${video_name%.*/}.jpg" # Output file name (same as video name with .jpg extension)
	tmp_thumbnail_path="$video_dir/thumbnails/${thumbnail}"
	# echo "${video} VIDEO Mp4"
	# echo "${video_name} VIDEO NAME"
	# echo "${thumbnail} THUMBNAIL"
	# echo "${video_dir} VIDEO DIR}"
	# echo "${thumbnail_dir} THUMBNAIL DIR"
	# echo "${tmp_thumbnail_path} TMP THUMBNAIL DIR"
	# echo "${thumbnail} THIS IS THE THUMBNAIL"
	# echo "${tmp_thumbnail_path} THIS IS THE THUMBNAIL PATH"

	# Check if the thumbnail already exists
	if [ ! -f "$tmp_thumbnail_path" ]; then
		ffmpeg -i "$video" -ss 00:00:05 -vframes 1 -vf "scale=640:-1" -c:v mjpeg "$tmp_thumbnail_path"
	else
		echo "Thumbnail already exists for $video_name. Skipping..."
	fi
done
