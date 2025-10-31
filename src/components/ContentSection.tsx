'use client'

import { Button } from '@/components/ui/button'

export function ContentSection() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Share Section */}
        <div className="text-center mb-12">
          <p className="text-gray-700 mb-4">Share this tool to your friends:</p>
          <div className="flex justify-center space-x-3">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Tweet
            </Button>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">
              Share
            </Button>
          </div>
        </div>

        {/* How to Use Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Use Height Comparison Tool?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We purposely created this free online tool to be uncomplicated and user-friendly, because you don't need any added stress in your life! Let's take things step by step on how to efficiently use this height comparison tool. Stick around to get the scoop on the multiple scenarios and reasons you can utilize this tool!
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Step 1: Gathering your Measurements & Subjects</h3>
              <p className="text-gray-700 leading-relaxed">
                You can jump in and play around with measurements just for giggles, but if you're looking to get an accurate take on a measuring scenario it would be best to know what you want to measure and what its measurements are ahead of time. If you aren't sure of an exact measurement, you can always do a quick Google search or use your best guess!
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Step 2: Entering your Data</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Time to punch in some numbers! As you'll soon see, the Height Comparison website is very neat, organized, and simplistic, it's designed this way to make this a breathable and enjoyable experience.
              </p>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• On the left side of the main page, there are two rectangular panels. One is for creating a human subject to place on the size comparison chart, and the other is an object generator with the same goal in mind.</li>
                <li>• For the human subject, you can customize their gender and name if you so please, and then but of course enter in their height in either feet (ft) or centimeters (cm). Plus, you can even pick out a color for them to be on the chart! Once you have put in those 4 simple details, you can submit the blue rectangle at the bottom of that panel that reads <strong>+ Add Person</strong>. They then will appear on the chart, ready for height comparison!</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Step 3: Compare, Plan, Have Fun!</h3>
              <p className="text-gray-700 leading-relaxed">
                Once you've got your people and or objects hanging out on the chart you can start your planning or fun comparing. This tool automatically converts measurements to centimeters to feet, and the other way around if you'd like. We provide measuring that you can trust!
              </p>
            </div>
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Use This Height Comparison Chart?</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Are you in the midst of remodeling your home, some new furniture you want to get your hands on, wanting to see which of your favorite fictional characters are the tallest, or shamelessly compare your height to your favorite celebrity? All these scenarios and <em>more</em> can be thoroughly accomplished with our handy dandy height comparison tool.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Easily utilize this site as way to plan out your dream design by measuring out furniture you want to move in or the size of remodels you want to make.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">1. Interactive Height Comparison Tool:</h4>
              <p className="text-gray-700 text-sm">Visualize height differences in real-time. Our tool allows you to input any height and instantly see an accurate visual comparison scaled to perfection.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">2. Customizable Avatars:</h4>
              <p className="text-gray-700 text-sm">Take your comparisons to the next level by using customizable avatars. Change colors, styles, or upload unique avatars to create truly personalized height visuals.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">3. Multi-Height Comparisons:</h4>
              <p className="text-gray-700 text-sm">Want to compare more than two heights? No problem! You can input multiple heights to create fun group comparisons or visualize a lineup of your favorite people, characters, or objects.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">4. Mobile and Desktop Friendly:</h4>
              <p className="text-gray-700 text-sm">Designed for modern users, our platform works perfectly on any device, whether you're on your phone, tablet, or desktop.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
