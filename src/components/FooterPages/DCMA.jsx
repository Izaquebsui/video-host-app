import React from "react";
export default function DCMA() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6">DCMA</h1>
      <div className="max-w-2xl text-left space-y-4 text-lg">
        <p>
          Pursuant to Title 17, Section 512(c)(2) of the United States Code, if you believe that any of your copyrighted material is being infringed on the Website, we have designated an agent to receive notifications of claimed copyright infringement.
        </p>
        <p>
          Notifications should be e-mailed to <a href="mailto:duckduckmga@proton.me" className="text-pink-400">duckduckmga@proton.me</a> with Subject ‘DMCA’ or use Contact Form to notifications.
        </p>
        <p>
          All notifications not relevant to us or ineffective under the law will receive no response or action thereupon.
          Pursuant to Title 17, Section 512(c)(3) of the United States Code, an effective notification of claimed infringement must be a written communication to our agent that includes substantially the following:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Identification of the copyrighted work that is believed to be infringed. Please describe the work and, where possible, include a copy or the location (e.g., a URL) of an authorized version of the work</li>
          <li>Identification of the material that is believed to be infringing and its location. Please describe the material and provide a URL or any other pertinent information that will allow us to locate the material on the Website</li>
          <li>Information that will allow us to contact you, including your address, telephone number and, if available, your e-mail address</li>
          <li>A statement that you have a good faith belief that the use of the material complained of is not authorized by you, your agent or the law</li>
          <li>A statement that the information in the notification is accurate and that under penalty of perjury that you are the owner or are authorized to act on behalf of the owner of the work that is allegedly infringed</li>
          <li>A physical or electronic signature from the copyright holder or an authorized representative</li>
        </ul>
      </div>
    </div>
  );
}
