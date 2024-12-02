"use client";
import { useAuth } from "@clerk/nextjs";
import { cn } from "~/lib/utils";
import { Textarea } from "~/app/_components/ui/textarea";
import { SubmitButton } from "~/app/_components/submit-button";
import { createPostOrComment, type FormState } from "~/app/actions";
import { useFormState } from "react-dom";

/**
 * Create a post or a comment.
 *
 * @param {Object} options - The options for creating a post or a comment.
 * @param {Object} options.comment - The comment object (optional).
 *      - comment.postId: The ID of the post where the comment will be created.
 * @param {string} options.className - The class name for the form (optional).
 *
 * @return {JSX.Element} The form component for creating a post or a comment.
 */
export function CreatePostOrComment({
  comment,
  className,
}: {
  comment?: { postId: string };
  className?: string;
}) {
  const { isSignedIn } = useAuth();

  const createPostOrCommentAction = createPostOrComment.bind(null, comment);

  const [formState, formAction] = useFormState(createPostOrCommentAction, {
    inputContent: "",
  } as FormState);

  return (
    <form
      className={cn("flex w-8/12 flex-col gap-2 md:max-w-lg", className)}
      action={formAction}
    >
      <Textarea
        placeholder={comment ? "Add a comment..." : "What's on your mind?"}
        name="content"
        className="resize-none"
        defaultValue={formState ? formState.inputContent : undefined}
      />
      {!isSignedIn && (
        <p className="text-sm text-gray-500">You must be logged in to post.</p>
      )}
      <SubmitButton isSignedIn={isSignedIn} comment={comment} />
    </form>
  );
}
