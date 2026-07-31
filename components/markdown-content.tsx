import React from "react";

type MarkdownContentProps = {
  content: string;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  const blocks = content.split(/\n{2,}/).filter((block) => block.trim());

  return (
    <div className="article-prose">
      {blocks.map((block, index) => renderBlock(block.trim(), index))}
    </div>
  );
}

function renderBlock(block: string, key: number) {
  const image = block.match(/^!\[([^\]]*)]\(([^)]+)\)$/);
  if (image) {
    const [, alt, src] = image;
    return (
      <figure key={key}>
        <img src={src} alt={alt} loading="lazy" />
      </figure>
    );
  }

  if (block.startsWith("### ")) {
    return <h3 key={key}>{renderInline(block.replace(/^###\s+/, ""))}</h3>;
  }

  if (block.startsWith("## ")) {
    return <h2 key={key}>{renderInline(block.replace(/^##\s+/, ""))}</h2>;
  }

  if (block.startsWith("# ")) {
    return <h2 key={key}>{renderInline(block.replace(/^#\s+/, ""))}</h2>;
  }

  if (/^(-{3,}|\*{3,}|_{3,})$/.test(block)) {
    return <hr key={key} />;
  }

  if (block.startsWith("> ")) {
    return <blockquote key={key}>{renderInlineWithBreaks(block.replace(/^>\s?/gm, ""))}</blockquote>;
  }

  if (isMarkdownTable(block)) {
    const [header, , ...rows] = block.split(/\n/).map(parseTableRow);
    return (
      <div className="overflow-x-auto" key={key}>
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr>
              {header.map((cell, index) => (
                <th className="border border-ink/10 bg-ink px-4 py-3 font-medium text-white" key={`${cell}-${index}`}>
                  {renderInline(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr className="even:bg-white" key={`${row.join("-")}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td className="border border-ink/10 px-4 py-3 align-top" key={`${cell}-${cellIndex}`}>
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (/^[-*]\s+/m.test(block)) {
    return (
      <ul key={key}>
        {block.split(/\n/).map((line) => (
          <li key={line}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>
        ))}
      </ul>
    );
  }

  if (/^\d+\.\s+/m.test(block)) {
    return (
      <ol key={key}>
        {block.split(/\n/).map((line) => (
          <li key={line}>{renderInline(line.replace(/^\d+\.\s+/, ""))}</li>
        ))}
      </ol>
    );
  }

  return <p key={key}>{renderInlineWithBreaks(block)}</p>;
}

function isMarkdownTable(block: string) {
  const lines = block.split(/\n/);
  return (
    lines.length >= 2 &&
    lines[0].trim().startsWith("|") &&
    /^\|?[\s:|-]+\|?$/.test(lines[1].trim())
  );
}

function parseTableRow(row: string) {
  return row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+]\([^)]+\)|https?:\/\/[^\s)]+)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) parts.push(text.slice(cursor, match.index));
    const token = match[0];

    if (token.startsWith("**")) {
      parts.push(<strong key={`${token}-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      parts.push(<em key={`${token}-${match.index}`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`")) {
      parts.push(<code key={`${token}-${match.index}`}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("http")) {
      parts.push(
        <a key={`${token}-${match.index}`} href={token} target="_blank" rel="noopener noreferrer">
          {token}
        </a>,
      );
    } else {
      const link = token.match(/^\[([^\]]+)]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        const isExternal = href.startsWith("http");
        parts.push(
          <a key={`${href}-${match.index}`} href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
            {label}
          </a>,
        );
      }
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));

  return parts;
}

function renderInlineWithBreaks(text: string) {
  return text.split(/\n/).flatMap((line, index, lines) => {
    const rendered = renderInline(line);
    return index < lines.length - 1 ? [...rendered, <br key={`br-${index}`} />] : rendered;
  });
}
