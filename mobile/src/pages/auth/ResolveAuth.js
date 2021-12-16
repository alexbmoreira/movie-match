import { withState } from "@shared";
import AuthState from "./state/AuthState";

const ResolveAuth = ({ uiState }) => {
  uiState.resolveAuth()

  return null;
}

export default withState(ResolveAuth, AuthState)
