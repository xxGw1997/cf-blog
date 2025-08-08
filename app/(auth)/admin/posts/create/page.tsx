"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayTimePicker } from "@/components/day-time-picker";

const postFormSchema = z
  .object({
    title: z
      .string()
      .min(1, {
        error: "请填写文章标题",
      })
      .max(30, {
        error: "文章标题最多不能超过30个字符.",
      }),
    desc: z.string().min(1, { error: "请填写描述" }).max(50, {
      error: "描述最多不能超过50个字符.",
    }),
    content: z.string().min(1, { error: "请填写文章内容" }),
    isPublishNow: z.boolean(),
    publishedAt: z.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.isPublishNow && !data.publishedAt) {
        return false;
      }
      return true;
    },
    {
      error: "请选择发布时间",
      path: ["publishedAt"],
    }
  );

const formInitValue = {
  title: "",
  desc: "",
  content: "",
  isPublishNow: true,
  publishedAt: new Date(),
};

const CreatePostPage = () => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      ...formInitValue,
    },
  });

  const onSubmit = (values: z.infer<typeof postFormSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-5xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input placeholder="请输入标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <Input placeholder="请输入描述内容" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>内容</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-[500px] overflow-x-hidden overflow-y-scroll"
                    placeholder="请输入文章内容"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublishNow"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">立即发布</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {!form.watch("isPublishNow") && (
            <FormField
              control={form.control}
              name="publishedAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>发布时间</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy年M月d日 HH:mm:ss")
                          ) : (
                            <span>选择时间</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DayTimePicker
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date <= new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit">提交</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostPage;
