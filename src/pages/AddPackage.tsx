import React from 'react'
import { useForm } from 'react-hook-form';
import styled from 'styled-components'
import { screenSize } from '../themes/global';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    packageName: yup.string().required(),
    installationTime: yup.number().positive().integer().required(),
}).required();

const AddPackageWrapper = styled.div`
    display: flex;
    grid-row: 6 / 7;
    grid-column: 1 / 13;
    flex-direction: column;
    background: white;

    @media ${screenSize.tablet} {
        grid-column: 2 / 12;
        margin: 3.2rem 0;
    }

    @media ${screenSize.desktop} {
        grid-column: 4 / 10;
        margin: 3.2rem 0;
    }
`;

const Textbox = styled.input`
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${p => p.theme.primaryTextColor};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius:  0;;
    transition: border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
    margin-bottom: 16px;

    &:focus-visible {
    outline: -webkit-focus-ring-color 1px;
    outline-color: ${p => p.theme.primaryColor};
    outline-style: auto;
    outline-width: 1px;
}
`


export const AddPackage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur',
    });
    const onSubmit = (data: any) => console.log(data);


    console.log('errors', errors)

    return (
        <>
            <AddPackageWrapper>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Textbox {...register("packageName")} />
                    {errors.packageName && <p>Packagename is required</p> }
                    
                    <Textbox {...register("installationTime")} />
                    {/* { errors && console.log(errors)}               */}
                    <input type="submit" />
                </form>

            </AddPackageWrapper>
        </>
    )
}
