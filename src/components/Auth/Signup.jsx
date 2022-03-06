import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, HomeOutlined } from '@ant-design/icons';

import { useDispatchContext } from '../../GlobalStateProvider'
import { signup } from '../../actions/auth'

function Signup() {
    const { setUser } = useDispatchContext()
    const [checked, setChecked] = useState(true)
    const [showErr, setShowErr] = useState(false)
    const navigate = useNavigate()

    const onFinish = (values) => {
        if (!checked) {
            setShowErr(true)
        } else {
            console.log(values)
            const user = {
                name: values.name,
                email: values.email,
                address: values.address,
                password: values.password,
                password_confirmation: values.password
            }
            signup(user)
                .then((data) => {
                    console.log(data)
                    setUser(data.user)
                    navigate("/shop", { replace: true })
                })
                .catch(err => message.error(err.response.data.message))
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo, checked);
        if (!checked) {
            setShowErr(true)
        }
    };

    const onCheckboxChange = (e) => {
        setChecked(e.target.checked)
        if (e.target.checked) {
            setShowErr(false)
        }
    }

    return (
        <>
            <div className='auth-container'>
                <h1 className="auth-header">SIGN UP</h1>
                <Form
                    className="auth-form"
                    name="basic"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        className="form-items"
                        name="name"
                        style={{ color: 'white' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        className="form-items"
                        name="email"
                        style={{ color: 'white' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        className="form-items"
                        name="address"
                        style={{ color: 'white' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Address" />
                    </Form.Item>

                    <Form.Item
                        className="form-items"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="checked"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: 'Please agree to the terms and conditions.',
                            },
                        ]}
                    >
                        <Checkbox checked={checked} onChange={onCheckboxChange} style={{ color: "#fafafa" }}>
                            By continuing, you agree to accept our <br />Privacy Policy &amp; Terms of Service.
                            {showErr ? <div style={{ color: '#ff4d4f' }}>Please agree to the terms and conditions!</div> : ''}
                        </Checkbox>
                    </Form.Item>

                    <Form.Item className="form-items">
                        <Button className="auth-btn" type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>

                    <Form.Item className="form-items">
                        <p className="auth-question">Already have an account? <Link className="redirect-to-auth" to="/login">
                            <strong>Login</strong></Link></p>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Signup