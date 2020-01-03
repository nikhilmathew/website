const Joi = require('joi');

function validatePost({title, headerImageURL, metaKeywords,
    metaDescription, postedDate = Date.now(), body, published = 0}) {
    const postSchema = Joi.object({
        title: Joi.string().required(),
        headerImageURL: Joi.string().required(),
        metaDescription: Joi.string().required(),
        postedDate: Joi.number().required(),
        body: Joi.string().required(),
        published: Joi.number().allow(0, 1).required(),
        metaKeywords: Joi.array().items(Joi.string()).required()
    });

    const { error } = Joi.validate({
        title, headerImageURL, metaDescription, 
        postedDate, body, published, metaKeywords
    }, postSchema);
    return error;
}

function validateSetPublished(body) {
    const schema = Joi.object({
        _id: Joi.string().required(),
        published: Joi.number().allow(0, 1).required()
    });
    const { error } = Joi.validate(body, schema);
    return error;
}

function validateDeleteMedia(body) {
    const schema = Joi.object({
        _id: Joi.string().required()
    });
    const { error } = Joi.validate(body, schema);
    return error;
}

function validateGetMedia(query) {
    const schema = Joi.object({
        skip: Joi.string().regex(/^\d+$/).default('0'),
        limit: Joi.string().regex(/^\d+$/).default('20'),
        sortBy: Joi.string().regex(/^usedInPosts$/),
        sortOrder: Joi.string().regex(/^(-1|1)$/).default('-1')
    });

    const { error } = Joi.validate(query, schema);
    return error;
}

module.exports = {
    validatePost,
    validateSetPublished,
    validateDeleteMedia,
    validateGetMedia
};