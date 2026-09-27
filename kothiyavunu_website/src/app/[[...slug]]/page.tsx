import { notFound } from "next/navigation";
import AccountPage from "../components/account/AccountPage";
import AboutPage from "../components/about/AboutPage";
import { LandingPage } from "../components/home/LandingPage";
import RecipeCardPage from "../components/recipes/RecipeCardPage";
import RecipesPage from "../components/recipes/RecipesPage";
import { recipes } from "../components/recipes/dummy_data/recipes";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;

  if (slug.length === 0) {
    return <LandingPage />;
  }

  if (slug.length === 1 && slug[0] === "recipes") {
    return <RecipesPage />;
  }

  if (slug.length === 2 && slug[0] === "recipes") {
    const recipe = recipes.find((item) => item.id === slug[1]);

    if (recipe) {
      return <RecipeCardPage recipe={recipe} />;
    }

    notFound();
  }

  if (slug.length === 1 && slug[0] === "about") {
    return <AboutPage />;
  }

  if (slug.length === 1 && slug[0] === "account") {
    return <AccountPage />;
  }

  notFound();
}