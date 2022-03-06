import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '../../actions/auth'
import { useDispatchContext } from '../../GlobalStateProvider'

function Login() {
    const { setUser } = useDispatchContext()
    const navigate = useNavigate()

    const onFinish = (values) => {
        login(values)
            .then(data => {
                console.log(data)
                setUser(data.user)
                navigate("/shop", { replace: true })
            })
            .catch(err => {
                message.error(err.response.data.message)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo,)
    };

    return (
        <>
            <div className='auth-container'>
                <h1 className="auth-header">Login</h1>
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
                        name="email"
                        style={{ color: 'white' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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

                    <Form.Item className="form-items">
                        <Button className="auth-btn" type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item className="form-items">
                        <p className="auth-question">Don't have an account? <Link className="redirect-to-auth" to="/signup">
                            <strong>Sign Up</strong></Link></p>
                    </Form.Item>

                </Form>
            </div>
        </>
    )
}

export default Login