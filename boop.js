require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = process.env.GATSBY_FAUNA_COLLECTION;

module.exports = {
  // CREATE COMMENT
  createComment: async () => {
    const slug = "/posts/some-post"
    const name = "some name"
    const comment = "some comment"
    const results = await client.query(
      q.Create(q.Collection(COLLECTION_NAME), {
        data: {
          isApproved: false,
          slug: "test-slug-3",
          date: new Date().toString(),
          name: "comment tester 3",
          comment: "test comment 3",
        },
      })
    )
    console.log(JSON.stringify(results, null, 2))
    return {
      commentId: results.ref.id,
    }
  },
  // DELETE COMMENT BY ID
  deleteCommentById: async () => {
    const commentId = "360801935813509193";
    const results = await client.query(
      q.Delete(q.Ref(q.Collection(COLLECTION_NAME), commentId))
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      commentId: results.ref.id,
    };
  },
  // GET ALL COMMENTS
  getAllComments: async () => {
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-all-comments")))
    );
    console.log(JSON.stringify(results, null, 2));
    return results.data.map(([ref, isApproved, slug, date, name, comment]) => ({
      commentId: ref.id,
      isApproved,
      slug,
      date,
      name,
      comment,
    }));
  },
  // GET COMMENT BY SLUG
  getCommentsBySlug: async () => {
    const slug = "test-slug";
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-comments-by-slug"), slug))
    );
    console.log(JSON.stringify(results, null, 2));
    return results.data.map(([ref, isApproved, slug, date, name, comment]) => ({
      commentId: ref.id,
      isApproved,
      slug,
      date,
      name,
      comment,
    }));
  },
  // APPROVE COMMENT BY ID
  approveCommentById: async () => {
    const commentId = '360801848882364489'
    const results = await client.query(
      q.Update(q.Ref(q.Collection(COLLECTION_NAME), commentId), {
        data: {
          isApproved: true,
        },
      })
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      isApproved: results.isApproved,
    };
  },
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
