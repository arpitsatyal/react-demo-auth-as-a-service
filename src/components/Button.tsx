import Button from "@mui/material/Button";
import { errorInterface } from "../interfaces";

interface ButtonProps {
  handleSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  type: string;
  errorX: errorInterface;
  toValidate: string[];
}

const ButtonComp = ({
  handleSubmit,
  type,
  errorX,
  toValidate,
}: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={handleSubmit}
      style={{
        marginTop: "20px",
      }}
      disabled={
        (type !== "edit" || errorX.error) && (!toValidate[0] || !toValidate[1])
      }
      fullWidth
    >
      Submit
    </Button>
  );
};

export default ButtonComp;
