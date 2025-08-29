import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Timeline,
	TimelineConnector,
	TimelineContent,
	TimelineItem,
	TimelinePoint,
} from "../components/timeline";
import { Check, CircleUser, Mail } from "lucide-react";

const meta: Meta<typeof Timeline> = {
	title: "components/Timeline",
	component: Timeline,
	tags: ["autodocs"],
	args: {
		className: "w-96",
	},
};

export default meta;

const TimelineItems = () => (
	<>
		<TimelineItem>
			<TimelinePoint>
				<div className="h-3 w-3 rounded-full bg-gray-400" />
				<TimelineConnector />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">User Registered</h2>
				<p className="text-sm text-gray-500">User created an account.</p>
			</TimelineContent>
		</TimelineItem>
		<TimelineItem>
			<TimelinePoint>
				<div className="h-3 w-3 rounded-full bg-gray-400" />
				<TimelineConnector />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">Email Verified</h2>
				<p className="text-sm text-gray-500">
					User verified their email address.
				</p>
			</TimelineContent>
		</TimelineItem>
		<TimelineItem>
			<TimelinePoint>
				<div className="h-3 w-3 rounded-full bg-gray-400" />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">Profile Completed</h2>
				<p className="text-sm text-gray-500">
					User filled out their profile.
				</p>
			</TimelineContent>
		</TimelineItem>
	</>
);

export const Default: StoryObj<typeof Timeline> = {
	args: {
		children: <TimelineItems />,
	},
};

const TimelineItemsWithIcon = () => (
	<>
		<TimelineItem>
			<TimelinePoint>
				<CircleUser className="h-5 w-5 text-gray-500" />
				<TimelineConnector />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">User Registered</h2>
				<p className="text-sm text-gray-500">User created an account.</p>
			</TimelineContent>
		</TimelineItem>
		<TimelineItem>
			<TimelinePoint>
				<Mail className="h-5 w-5 text-gray-500" />
				<TimelineConnector />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">Email Verified</h2>
				<p className="text-sm text-gray-500">
					User verified their email address.
				</p>
			</TimelineContent>
		</TimelineItem>
		<TimelineItem>
			<TimelinePoint>
				<Check className="h-5 w-5 text-gray-500" />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">Profile Completed</h2>
				<p className="text-sm text-gray-500">
					User filled out their profile.
				</p>
			</TimelineContent>
		</TimelineItem>
	</>
);

export const WithIcon: StoryObj<typeof Timeline> = {
	args: {
		children: <TimelineItemsWithIcon />,
	},
};

const CustomPoint = () => (
	<svg height="20" width="20">
		<circle cx="10" cy="10" r="8" stroke="rgb(75 85 99)" strokeWidth="2" fill="transparent" />
	</svg>
)

const TimelineItemsWithCustomComponent = () => (
	<>
		<TimelineItem>
			<TimelinePoint>
				<CustomPoint />
				<TimelineConnector />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">User Registered</h2>
				<p className="text-sm text-gray-500">User created an account.</p>
			</TimelineContent>
		</TimelineItem>
		<TimelineItem>
			<TimelinePoint>
				<CustomPoint />
				<TimelineConnector />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">Email Verified</h2>
				<p className="text-sm text-gray-500">
					User verified their email address.
				</p>
			</TimelineContent>
		</TimelineItem>
		<TimelineItem>
			<TimelinePoint>
				<CustomPoint />
			</TimelinePoint>
			<TimelineContent>
				<h2 className="font-semibold">Profile Completed</h2>
				<p className="text-sm text-gray-500">
					User filled out their profile.
				</p>
			</TimelineContent>
		</TimelineItem>
	</>
);

export const WithCustomPoint: StoryObj<typeof Timeline> = {
	args: {
		children: <TimelineItemsWithCustomComponent />,
	},
};

const TimelineItemsWithProgress = () => (
  <>
    <TimelineItem>
      <TimelinePoint>
        <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="h-4 w-4 text-white" />
        </div>
        <TimelineConnector className="border-green-500" />
      </TimelinePoint>
      <TimelineContent>
        <h2 className="font-semibold">User Registered</h2>
        <p className="text-sm text-gray-500">User created an account.</p>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelinePoint>
        <div className="h-5 w-5 rounded-full bg-blue-500" />
        <TimelineConnector className="border-dashed" />
      </TimelinePoint>
      <TimelineContent>
        <h2 className="font-semibold">Email Verified</h2>
        <p className="text-sm text-gray-500">
          User verified their email address.
        </p>
      </TimelineContent>
    </TimelineItem>
    <TimelineItem>
      <TimelinePoint>
        <div className="h-5 w-5 rounded-full bg-gray-300" />
      </TimelinePoint>
      <TimelineContent>
        <h2 className="font-semibold">Profile Completed</h2>
        <p className="text-sm text-gray-500">
          User filled out their profile.
        </p>
      </TimelineContent>
    </TimelineItem>
  </>
);

export const WithProgress: StoryObj<typeof Timeline> = {
	args: {
		children: <TimelineItemsWithProgress />,
	},
};
