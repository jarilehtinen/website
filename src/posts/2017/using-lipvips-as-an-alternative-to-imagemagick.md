---
layout: post.njk
title: "Using libvips as an alternative to ImageMagick"
description: "Finding the fastest way to create thumbnails."
date: 2017-11-11
author: Jari Lehtinen
tags: ['post', 'tech']
---
I have been using [ImageMagick](http://www.imagemagick.org/) to resize large images into thumbnails as long as I remember.

Few weeks ago I encountered a server issue where several [convert](https://www.imagemagick.org/script/convert.php) processes consumed most of the server's memory and things went haywire.

I started to look for alternatives: better performing image resizing software which consumes less processing power and memory.

## Performance testing

I found a repository called [speedtest-resize](https://github.com/fawick/speedtest-resize) which compares various image resize algorithms.

I took few large images and converted them to 4 different sized thumbnails using [fastjpeg](https://camlistore.org/pkg/images/fastjpeg) and [libvips](https://github.com/jcupitt/libvips), repeated the process 100 times and measured the time taken.

## libvips is over 50% faster

I did not expect the difference to be that big, but **libvips performed approximately 50-60% faster than ImageMagick** - no matter what I threw at it. If you do some other adjustments besides resizing, you might lose some features over ImageMagick.

## Using libvips

Using libvips's *[vipsthumbnail](https://jcupitt.github.io/libvips/API/current/Using-vipsthumbnail.md.html)* command is easy:

`vipsthumbnail source.jpg -s 100x100 -o output.jpg[Q=90,optimize_coding,strip]`

* **-s [width]x[height]** Output image target width and height  
* **-o *path*** Output image file path
* **Q=*n*** Image quality/compression (n = 1-100, default 75)
* **optimize_coding** Turns on the libjpeg's coding optimizer<sup>[[1]](#note-1)</sup>
* **strip** Strips all the metadata from the image

## Conclusion

If you do a lot of server-side image resizing, I recommend you give libvips a try. It's faster – a lot faster.

---

### See also

* [Instructions how to install libvips](http://jcupitt.github.io/libvips/install.html)

---

### Notes

<a name="note-1"></a>1. optimize_coding is described as "compute optimal Huffman coding tables", whatever that means.