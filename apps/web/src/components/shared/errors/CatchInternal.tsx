import React from 'react'
import { DefaultLayout } from '../../layouts'

type CatchInternalProps = {}

export const CatchInternal: React.FC<CatchInternalProps> = () => {

    return <DefaultLayout queryStatus={500}>Redirection</DefaultLayout>
}