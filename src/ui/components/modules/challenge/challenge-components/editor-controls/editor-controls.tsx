import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { RotateCcw } from "lucide-react";

interface Props {
  fontSize: number;
  setFontSize: (size: number) => void;
  onReset: () => void;
}

export function EditorControls({ fontSize, setFontSize, onReset }: Props) {
  return (
    <>
      <Flex align="center" className="shadow-md mb-2 p-2" justify="between">
        <Flex align="center" gap="1">
          <Text size="1">Font size</Text>
          <Select.Root
            size="1"
            value={String(fontSize)}
            onValueChange={(value) => setFontSize(Number(value))}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Font Size</Select.Label>
                <Select.Item value="14">Small</Select.Item>
                <Select.Item value="16">Medium</Select.Item>
                <Select.Item value="18">Big</Select.Item>
                <Select.Item value="20">Huge</Select.Item>
                <Select.Item value="22">Giant</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Button onClick={onReset} aria-label="Reset code" size="1" variant="ghost">
          <RotateCcw size="20" />
        </Button>
      </Flex>
    </>
  );
}
