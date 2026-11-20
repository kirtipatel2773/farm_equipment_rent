import FarmingArticle from '../../models/FarmingArticle.js';

export const getArticles = async (req, res, next) => {
  try {
    const { category, language } = req.query;

    const filter = { published: 1 };
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (language) {
      filter.language = language;
    }

    const articles = await FarmingArticle.find(filter).sort({ _id: 1 });

    res.json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (err) {
    next(err);
  }
};

export const getArticleBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await FarmingArticle.findOne({ slug, published: 1 });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Farming guide article not found.'
      });
    }

    res.json({
      success: true,
      data: article
    });
  } catch (err) {
    next(err);
  }
};
