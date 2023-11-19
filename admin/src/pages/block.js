import { Button, Result } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthAction from 'redux/thunks/authAction';

const BlockPage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Result
      status="error"
      title="Account Blocked"
      subTitle="You have been blocked by management."
      extra={[
        <Button
          onClick={() => {
            dispatch(AuthAction.logout());
          }}
          type="primary"
          key="logout"
        >
          Log out
        </Button>,
      ]}
    ></Result>
  );
};

export default BlockPage;
