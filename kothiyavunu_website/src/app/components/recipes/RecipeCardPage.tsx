import Link from "next/link";
import { comments } from "./dummy_data/comments";
import type { CommentRecord, Recipe } from "./dummy_data/types";
import styles from "./RecipeCardPage.module.css";

type RecipeCardPageProps = {
  recipe: Recipe;
};

function getParentComments(recipe: Recipe): CommentRecord[] {
  const commentsById = new Map(comments.map((comment) => [comment.id, comment]));
  const recipeComments: CommentRecord[] = [];
  const visitedIds = new Set<string>();
  let commentId = recipe.comments.headId;

  while (commentId && !visitedIds.has(commentId)) {
    visitedIds.add(commentId);
    const comment = commentsById.get(commentId);

    if (!comment || comment.recipeId !== recipe.id || comment.parentCommentId !== null) {
      break;
    }

    recipeComments.push(comment);
    commentId = comment.nextSiblingId;
  }

  return recipeComments;
}

export default function RecipeCardPage({ recipe }: RecipeCardPageProps) {
  const parentComments = getParentComments(recipe);

  return (
    <main className={styles.page}>
      <article className={styles.content}>
        <Link className={styles.backLink} href="/recipes">
          <span aria-hidden="true">←</span> All recipes
        </Link>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Kothiyavunu recipe</p>
          <h1>{recipe.title}</h1>
          <p className={styles.description}>{recipe.description}</p>
          <p className={styles.rating}>
            <span>Community rating</span>
            <strong>{recipe.rating.toFixed(1)} / 5</strong>
          </p>
        </header>

        <section className={styles.mediaSection} aria-label="Recipe media">
          <div className={styles.imagePlaceholder} role="img" aria-label={`Image placeholder for ${recipe.title}`}>
            <span>Recipe image preview</span>
          </div>
          <dl className={styles.mediaDetails}>
            <div>
              <dt>Image URL</dt>
              <dd>{recipe.imageUrl}</dd>
            </div>
            <div>
              <dt>Video URL</dt>
              <dd>{recipe.videoUrl}</dd>
            </div>
          </dl>
        </section>

        <div className={styles.recipeDetails}>
          <section className={styles.ingredients} aria-labelledby="ingredients-title">
            <p className={styles.eyebrow}>Gather and prepare</p>
            <h2 id="ingredients-title">Ingredients</h2>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name}>
                  <span>{ingredient.name}</span>
                  <span>
                    {ingredient.amount} {ingredient.units}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.steps} aria-labelledby="steps-title">
            <p className={styles.eyebrow}>From start to finish</p>
            <h2 id="steps-title">Cooking steps</h2>
            <ol>
              {recipe.cookingSteps.map((step) => (
                <li key={step.stepNumber}>
                  <span className={styles.stepNumber}>{step.stepNumber}</span>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section className={styles.comments} aria-labelledby="comments-title">
          <p className={styles.eyebrow}>From the community</p>
          <h2 id="comments-title">Comments ({parentComments.length})</h2>
          {parentComments.length > 0 ? (
            <ul>
              {parentComments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.text}</p>
                  <span>
                    {comment.author} · {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noComments}>No comments yet.</p>
          )}
        </section>
      </article>
    </main>
  );
}