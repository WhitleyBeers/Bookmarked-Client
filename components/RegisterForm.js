import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import { getSingleUser } from '../api/userData';

function RegisterForm({ user, updateUser }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user.fbUser.email,
    uid: user.uid,
    profileImageUrl: '',
    bio: '',
  });

  useEffect(() => {
    if (user.id) {
      getSingleUser(user.id).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          id: userObj.id,
          firstName: userObj.first_name,
          lastName: userObj.last_name,
          profileImageUrl: userObj.profile_image_url,
          bio: userObj.bio,
        }));
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const payload = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profileImageUrl: formData.profileImageUrl,
        bio: formData.bio,
      };
      updateUser(payload).then((router.push('/profile')));
    } else {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* FIRST NAME FIELD */}
      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" required value={formData.firstName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* LAST NAME FIELD */}
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" required value={formData.lastName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* PROFILE IMAGE URL FIELD */}
      <Form.Group className="mb-3" controlId="profileImageUrl">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="url" name="profileImageUrl" required value={formData.profileImageUrl} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      {/* ADDRESS FIELD */}
      <Form.Group className="mb-3" controlId="bio">
        <Form.Label>Tell us about yourself:</Form.Label>
        <Form.Control type="textarea" name="bio" required value={formData.bio} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.string,
    fbUser: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
