"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";

export function LandingPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!imageFile) {
      setImageUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImageUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  return (
    <main className={styles.page}>
      <section className={styles.intro} aria-labelledby="welcome-title">
        <p className={styles.eyebrow}>An Introduction To Kerala Style Recipes</p>
        <h1 id="welcome-title">Welcome to Kothiyavunu!</h1>
        <p className={styles.lead}>
          A home for the flavors, stories, and everyday joy of good food.
        </p>
      </section>

      <section className={styles.uploadSection} aria-label="Featured image">
        <div className={styles.uploadFrame}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Your uploaded featured image"
              fill
              unoptimized
              sizes="(max-width: 700px) 100vw, 1100px"
              className={styles.uploadedImage}
            />
          )}
          <div className={imageUrl ? styles.imageControls : styles.uploadPlaceholder}>
            <label className={imageUrl ? styles.imageUploadMark : styles.placeholderMark}>
              <input
                className={styles.fileInput}
                type="file"
                accept="image/*"
                aria-label={imageUrl ? "Change featured image" : "Upload featured image"}
                onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              />
              <span aria-hidden="true">+</span>
            </label>
            {!imageUrl && (
              <>
                <span className={styles.placeholderTitle}>Your featured image</span>
                <span className={styles.placeholderHint}>Choose an image from your device</span>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={styles.story} aria-label="Introduction">
        <div className={styles.storyImage} role="img" aria-label="Decorative image placeholder">
          <span className={styles.storyImageLabel}>Image placeholder</span>
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>From our kitchen</p>
          <h2>A little more about us</h2>
          <p>
            Add a description here to share the inspiration behind Kothiyavunu,
            the recipes you love, and the memories that gather around your table.
          </p>
        </div>
      </section>
    </main>
  );
}