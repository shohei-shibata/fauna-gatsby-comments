import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { format } from "date-fns";
import { Link } from "gatsby";

import {
  Heading,
  Text,
  Flex,
  Box,
  Divider,
  Button,
} from "@theme-ui/components";

import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

const PostsLayout = ({
  data: {
    mdx: {
      id,
      body,
      frontmatter: { title, date },
    },
  },
  pageContext,
}) => {
  const { prev, next } = pageContext;

  return (
    <Box>
      <Heading as="h1" variant="styles.h1">
        {title}
      </Heading>
      <Text variant="styles.small" sx={{ color: "highlight" }}>
        {format(new Date(date), "d MMMM u")}
      </Text>
      <Text variant="styles.small" sx={{ color: "muted" }}>
        {`id: ${id}`}
      </Text>
      <MDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
      <Divider />
      <Flex
        sx={{
          justifyContent: "space-between",
          mx: (theme) => `-${theme.space[2]}px`,
        }}
      >
        <Box>
          {prev && (
            <Box>
              <Link to={prev.fields.slug}>
                <Button tabIndex={-1} variant="ghost">
                  Prev
                </Button>
              </Link>
            </Box>
          )}
        </Box>
        <Box>
          {next && (
            <Box>
              <Link to={next.fields.slug}>
                <Button tabIndex={-1} variant="ghost">
                  Next
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Flex>
      <Divider />
      <Text
        sx={{
          color: "secondary",
          mb: 2,
          fontStyle: "italic",
        }}
      >
        Comments
      </Text>
      <Divider />
      <Comment
        date="2020-04-11T00:00:00.000Z"
        name="Jimi Hendix"
        comment="You jump in front of my car when you, you know all the time. Ninty miles an hour girl, is the speed I drive. You tell me it's alright, you don't mind a little pain. You say you just want me to, take you for a drive."
      />
      <Divider />
      <Comment
        date="2020-04-11T00:00:00.000Z"
        name="Robert Plant"
        comment="Oh, let the sun beat down upon my face. With stars to fill my dream. I am a traveler of both time and space. To be where I have been."
      />
      <Divider />
      <CommentForm />
      <Divider />
    </Box>
  );
};

export const post = graphql`
  query getSinglePost($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      excerpt
      frontmatter {
        title
        date
      }
      fields {
        slug
      }
    }
  }
`;

export default PostsLayout;