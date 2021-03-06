import { useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './Styles';
import UserForm from '../../components/UserForm/UserForm';

const CreateUser = ({ submitUser }) => {
  const classes = useStyles();
  const ref = useRef(null);

  const handleSubmit = (newUser) => {
    submitUser(newUser);
  };

  return (
    <div>
      <Typography variant="h2">New User</Typography>
      <div className={classes.userFormContainer}>
        <UserForm user={null} editMade={null} submit={handleSubmit} ref={ref} />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => ref.current.sendForm()}
      >
        Submit New User
      </Button>
    </div>
  );
};

CreateUser.propTypes = {
  submitUser: PropTypes.func,
};

export default CreateUser;
