import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { updateValuationRequestFeedback } from "../../services/api.js";
import { toast } from "react-toastify";

const FeedbackDialog = ({ open, onClose, requestID, initialRequest }) => {
  //console.log("Initial Request:", initialRequest);
  const [feedback, setFeedback] = useState(initialRequest?.feedback || "");
  const [isFeedbackSent, setIsFeedbackSent] = useState(false);
  const feedbackInputRef = useRef(null);

  const mutation = useMutation({
    mutationKey: ["updateFeedback", requestID],
    mutationFn: (newFeedback) => {
      const updatedRequest = { ...initialRequest, feedback: newFeedback };
      return updateValuationRequestFeedback(requestID, updatedRequest);
    },
    onSuccess: () => {
      onClose();
      toast.success("Feedback sent successfully!", {
        position: "bottom-right",
      });
      console.log("Feedback sent successfully!");
      setIsFeedbackSent(true);
    },
    onError: (error) => {
      console.error("Error updating feedback:", error);
      toast.error("Error sending feedback.", {
        position: "bottom-right",
      });
    },
  });

  const handleSubmit = () => {
    console.log("Feedback:", feedback);
    mutation.mutate(feedback);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Give Feedback</DialogTitle>
      <DialogContent>
        <TextField
          ref={feedbackInputRef}
          autoFocus
          margin="dense"
          id="feedback"
          label="Feedback"
          type="text"
          variant="standard"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ width: "400px" }}
          multiline
          rows={3}
          disabled={isFeedbackSent}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {isFeedbackSent ? "Close" : "Cancel"}
        </Button>
        {!isFeedbackSent && (
          <Button onClick={handleSubmit} color="primary">
            Send
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
