import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background: #0d0d0d;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #2a2a2a;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#a3a3a3",
})`
  flex: 1;
  height: 42px;
  background: #161616;
  border-radius: 6px;
  padding: 0 15px;
  border: 1px solid #a80f1f;
  color: #f5f5f5;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #c1121f;
  margin-left: 10px;
  padding: 0 12px;
  border-radius: 6px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  margin: 0 20px 20px;
  padding: 14px;
  background: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const UserInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 105px;
  background: #1f1f1f;
  border: 2px solid #c1121f;
  border-radius: 6px;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
  text-align: left;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #c7c7c7;
  margin-top: 5px;
  text-align: left;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 6px;
  background: #c1121f;
  justify-content: center;
  align-items: center;
  height: 38px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const Header = styled.View`
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

export const AvatarPerfil = styled.Image`
  width: 100px;
  height: 150px;
  background: #1f1f1f;

`;

export const NamePerfil = styled.Text`
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  margin-top: 6px;
  text-align: center;
`;

export const BioPerfil = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #d0d0d0;
  margin-top: 6px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #141414;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  border: 1px solid #2a2a2a;
`;

export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #1f1f1f;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #ff4d5a;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #bdbdbd;
  margin-top: 2px;
`;