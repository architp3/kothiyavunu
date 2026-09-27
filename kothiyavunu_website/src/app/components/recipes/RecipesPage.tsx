"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./RecipesPage.module.css";
import { recipes } from "./dummy_data/recipes";

const recipeImageStyles: Record<string, string> = {
  "appam-vegetable-stew": styles.imageAppam,
  "kerala-fish-curry": styles.imageFish,
  "malabar-chicken-biryani": styles.imageBiryani,
  "puttu-kadala-curry": styles.imagePuttu,
  "vegetable-avial": styles.imageAvial,
  "crispy-banana-chips": styles.imageChips,
  "palada-payasam": styles.imagePayasam,
};

export default function RecipesPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredRecipes = recipes.filter((recipe) =>
    `${recipe.title} ${recipe.description} ${recipe.ingredients.map((ingredient) => ingredient.name).join(" ")}`
      .toLowerCase()
      .includes(normalizedQuery),
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>From our kitchen</p>
        <h1>Recipes</h1>
        <p className={styles.intro}>
          Find a new favorite among the flavors of Kerala.
        </p>
      </header>

      <section className={styles.recipeSection} aria-label="Browse recipes">
        <div className={styles.searchArea}>
          <label className={styles.searchLabel} htmlFor="recipe-search">
            Search recipes
          </label>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon} aria-hidden="true" />
            <input
              id="recipe-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by dish, ingredient, or category"
              autoComplete="off"
            />
            {query && (
              <button
                className={styles.clearButton}
                type="button"
                onClick={() => setQuery("")}
              >
                Clear
              </button>
            )}
          </div>
          <p className={styles.resultCount} aria-live="polite">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? "recipe" : "recipes"}
          </p>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className={styles.recipeGrid}>
            {filteredRecipes.map((recipe) => (
              <Link
                className={styles.recipeCard}
                href={`/recipes/${recipe.id}`}
                key={recipe.id}
                aria-label={`View ${recipe.title} recipe`}
              >
                <div
                  className={`${styles.recipeImage} ${recipeImageStyles[recipe.id]}`}
                  role="img"
                  aria-label={`Illustrative image placeholder for ${recipe.title}`}
                >
                  <span className={styles.imageCaption}>Recipe photo</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span>{recipe.ingredients.length} ingredients</span>
                    <span>{recipe.rating.toFixed(1)} / 5</span>
                  </div>
                  <h2>{recipe.title}</h2>
                  <p>{recipe.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState} role="status">
            No recipes match “{query}”. Try another dish or ingredient.
          </p>
        )}
      </section>
    </main>
  );
}