import { SelectChangeEvent } from "@mui/material/Select";
import { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonAppBar from "../Nav";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setPolicy } from "../redux/policyReducer";
import client from "../utils/authClient";
import axios from "axios";
import { PermissionType, PolicyType } from "../interfaces";
import { center } from "../utils/reusable_styles";
import Input from "../components/Input";
import RadioButton from "../components/RadioButton";
import ButtonComp from "../components/Button";
import SelectComponent2 from "../components/Select2";

const RoleForm: FC<{ type: string }> = ({ type }) => {
  const { permission, policy } = client;
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  const [role, setRole] = useState<any>([]);
  const [errorX, setErrorX] = useState({
    error: false,
    helperText: "",
    name: "",
  });

  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<any[]>) => {
    const { value } = event.target;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role2 } = useSelector((state: any) => state.role);
  const params: Readonly<Params<string>> = useParams();

  useEffect(() => {
    (async () => {
      const allPolicies: any = await policy.getAll();
      setPolicies(allPolicies);
    })();
  }, []);

  useEffect(() => {
    if (type === "edit") setRole(role2);
  }, []);

  function handleBack() {
    navigate("/");
    dispatch(setPolicy({}));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRole({ name: value });
    value === ""
      ? setErrorX({
          error: true,
          helperText: "name is required",
          name,
        })
      : setErrorX({ error: false, helperText: "", name });
  };

  async function handleSubmit() {
    let text = "";
    if (type === "create") {
      const toSend = {
        ...role,
        policyid: selected,
      };
      await axios.post(`http://localhost:8080/v1/roles/`, toSend);
      // await policy.createWithAllowOrDeny(toSend);
      text = "created";
    } else {
      // if (params.id) await role.update(params.id, policies);
      await axios.put(`http://localhost:8080/v1/roles/${params.id}`, role);
      text = "updated";
    }
    toast.success(`role ${text}!`);
  }

  return (
    <div style={{ position: "relative" }}>
      <ButtonAppBar />
      <Button
        variant="outlined"
        onClick={handleBack}
        style={{ margin: "0px 0px 20px 40px" }}
      >
        Go Back
      </Button>
      <p
        style={{
          textAlign: "center",
          fontSize: "larger",
          position: "absolute",
          top: "20%",
          left: "40%",
        }}
      >
        {" "}
        {type === "create" ? "Create a Role..." : `Edit: ${role2.Name}... `}
      </p>
      <div style={center}>
        {type === "create" && (
          <SelectComponent2
            policies={policies}
            handleChange={handleChange}
            selected={selected}
          />
        )}
        <Input
          type={type}
          isEdit={role2.Name}
          errorX={errorX}
          handleInputChange={handleInputChange}
          operation="Role Name"
          _name="name"
        />
        <ButtonComp
          handleSubmit={handleSubmit}
          type={type}
          errorX={errorX}
          toValidate={[role.name, true]}
        />
      </div>
    </div>
  );
};

export default RoleForm;