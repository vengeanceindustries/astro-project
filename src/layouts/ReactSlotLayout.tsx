import React from "react";

function CardHeader({ children }: React.PropsWithChildren) {
	return <div data-id="header">{children}</div>;
}

function CardFooter({ children }: React.PropsWithChildren) {
	return <div data-id="footer">{children}</div>;
}

export function Card(props: React.PropsWithChildren) {
	let header = [] as React.ReactNode[];
	let footer = [] as React.ReactNode[];
	let content = [] as React.ReactNode[];

	React.Children.forEach(props.children, (child, i) => {
		if (!React.isValidElement(child)) return;
		// const kid = { ...child, key: child.type.toString() + i };

		switch (child.type) {
			case CardHeader:
				return header.push(child);
			case CardFooter:
				return footer.push(child);
			default:
				return content.push(child);
		}
	});

	return (
		<div className="outline-dotted outline-orange-500/50 outline-offset-1">
			{!!header && (
				<header className="outline-1 outline-dashed outline-green-500/50">
					<pre className="text-sm">header:</pre> {header}
				</header>
			)}
			<div data-id="content">{content}</div>
			{!!footer && (
				<footer className="outline-1 outline-dashed outline-blue-500/50">
					<pre className="text-sm">footer:</pre> {footer}
				</footer>
			)}
		</div>
	);
}

Card.Header = CardHeader;
Card.Footer = CardFooter;

export default function ReactSlotLayout() {
	return (
		<Card>
			<Card.Header>
				<h1>Title!</h1>
			</Card.Header>
			<Card.Header>
				<h1>Second Header?</h1>
			</Card.Header>
			<Card.Footer>
				<a href="#">Read more</a>
			</Card.Footer>
			<Card.Footer>I am the footer!</Card.Footer>
			<p>Content</p>
		</Card>
	);
}
