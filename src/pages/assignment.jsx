import React from 'react'
import Layout from '../components/layout'
export default function Assignment() {
    return (
        <Layout>
            <section className='col-8 pt-5'>
                <form>
                    <div className='row justify-content-center'>
                        <div className="form-floating col-5">
                            <input name='Assignment title' type="text" className="form-control" id="Assignment-title" placeholder="Assignment title" required />
                            <label htmlFor="Assignment-title" className='ms-3'>Assignment title</label>
                        </div>
                        <div className="form-floating ps-3 mb-3 col-5">
                            <input name='Assignment Grade' type="text" className="form-control" id="Assignment-Grade" placeholder="Assignment Grade" required />
                            <label htmlFor="Assignment-Grade" className='ms-3'>Assignment Grade</label>
                        </div>
                        <div className="form-floating mb-3 col-5">
                            <input name='Assignment deadline' type="date" className="form-control" id="Assignment-deadline" placeholder="Assignment deadline" />
                            <label htmlFor="Assignment-deadline" className='ms-3'>Assignment deadline</label>
                        </div>
                        <div className="form-floating ps-3 mb-3 col-5">
                            <input name='Subject' type="text" className="form-control" id="Subject" placeholder="Subject" required />
                            <label htmlFor="Subject" className='ms-3'>Subject</label>
                        </div>
                        <div className="form-floating mb-3 col-10">
                            <textarea name='Assignment description' placeholder="Assignment description" className="form-control" id="Assignment-description" style={{ height: "100px" }}></textarea>
                            <label htmlFor="Assignment-description" className='ms-3'>Assignment description</label>
                        </div>
                    </div>
                    <button type="submit" className='w-10 btn btn-outline-primary offset-1 '>➕ Add</button>
                </form>

                <h3 className='mt-5 ps-3 text-capitalize text-center'>Previous Assignments:-</h3>

                <div class="accordion text-center offset-1 col-10 mt-4" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Accordion Item #1
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                <br /> <button className='mt-3 btn btn-outline-secondary'>Check Submissions</button>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Accordion Item #2
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                <br /> <button className='mt-3 btn btn-outline-secondary'>Check Submissions</button>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Accordion Item #3
                            </button>
                        </h2>
                        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                <br /> <button className='mt-3 btn btn-outline-secondary'>Check Submissions</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
