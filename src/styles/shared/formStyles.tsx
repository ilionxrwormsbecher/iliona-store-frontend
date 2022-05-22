import styled from "styled-components";

export const FormContent = styled.div`
    display: flex;
    flex-direction: row;
`;

export const FormWrapper = styled.div`
    display: inline-flex;
    width: calc(60% - 64px);
    padding: 32px;
    flex-direction: column;
`;

export const ErrorLine = styled.p`
    color: darkred;
    font-style: italic;
    margin-bottom: 4px;
`;

interface submitButtonProps {
    customText: string;
}

export const SubmitButton = styled.input.attrs<submitButtonProps>(({ customText }) => ({
    type: "submit",
    value: customText,
}))<submitButtonProps>`
    padding: 4px 64px;
    background-color: ${(p) => p.theme.primaryColor};
    color: white;
    outline: none;
    border: none;
    font-size: 14px;
    margin-top: 16px;

    &:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 4px;
`;

export const Textbox = styled.input`
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${(p) => p.theme.primaryTextColor};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 24px;

    &:focus-visible {
        outline: -webkit-focus-ring-color 1px;
        outline-color: ${(p) => p.theme.primaryColor};
        outline-style: auto;
        outline-width: 1px;
    }
    &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #999;
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #999;
    }

    &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #999;
    }
`;
