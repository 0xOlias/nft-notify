import type { NextPage } from 'next'
import Head from 'next/head'
import { Formik, Form, Field, FieldArray, FormikHelpers } from 'formik'
import axios from 'axios'

interface FormValues {
  email: string
  addresses: string[]
}

const HomePage: NextPage = () => {
  const handleSubmit = (values: FormValues, _: FormikHelpers<FormValues>) => {
    axios.post('/api/submit', values)
  }

  return (
    <>
      <Head>
        <title>NFT Notify</title>
      </Head>
      <div className="relative w-screen min-h-screen p-4">
        <div className="flex flex-col justify-center items-center w-full gap-4">
          <div>Welcome to NFT Notify</div>

          <Formik<FormValues> initialValues={{ email: '', addresses: [''] }} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="sam@ftx.com"
                    className="border border-black rounded-sm px-2 py-1"
                  />
                </div>

                <FieldArray name="addresses">
                  {({ remove, push }) => (
                    <div className="flex flex-col">
                      <label htmlFor="addresses">Addresses</label>
                      {values.addresses.map((address, idx) => (
                        <div key={idx} className="flex flex-row gap-2 mb-2">
                          <Field
                            name={`addresses.${idx}`}
                            className="border border-black rounded-sm px-2 py-1"
                            placeholder="olias.eth"
                          />
                          <button
                            type="button"
                            onClick={() => remove(idx)}
                            className="border border-red-500 rounded-sm  px-2 py-1"
                          >
                            x
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push('')}
                        className="border border-green-500 rounded-sm  px-2 py-1"
                      >
                        +
                      </button>
                    </div>
                  )}
                </FieldArray>

                <button type="submit" className="border border-black rounded-sm px-2 py-1">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default HomePage
