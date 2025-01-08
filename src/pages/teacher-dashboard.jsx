import React from 'react'
import Layout from '../components/layout'
import CalendarPage from '../components/calendar'

export default function Teacherdashboard() {
    return (
        <Layout>
            <section className='col-6'>
                <section className='row justify-content-end mt-5'>
                    <div className='quickaction col-11 shadow'>
                        <div className='row'>
                            <h3>Quick actions</h3>
                            <div class="card col-3 m-3" >
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                </div>
                            </div>

                            <div class="card col-3 m-3" >
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                </div>
                            </div>

                            <div class="card col-3 m-3" >
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </section>

            <section className='col-3 shadow side-panel bg-white '>
                <CalendarPage />
                <section >
                    <h3 className='text-center mt-3'>Notices</h3>
                    <ul class="notice overflow-y-scroll list-group shadow list-group-flush border-2">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                        <li class="list-group-item">A fourth item</li>
                        <li class="list-group-item">And a fifth one</li>
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                        <li class="list-group-item">A fourth item</li>
                        <li class="list-group-item">And a fifth one</li>
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                        <li class="list-group-item">A fourth item</li>
                        <li class="list-group-item">And a fifth one</li>
                    </ul>
                </section>
            </section>
        </Layout>
    )
}
