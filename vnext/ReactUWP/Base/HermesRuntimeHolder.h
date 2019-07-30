#pragma once

#include <DevSettings.h>

#include <jsi/ScriptStore.h>
#include <jsi/RuntimeHolder.h>

#include <Logging.h>

namespace react {
namespace uwp {

class HermesRuntimeHolder : public facebook::jsi::RuntimeHolderLazyInit {
public:
  std::shared_ptr<facebook::jsi::Runtime> getRuntime() noexcept override;
  HermesRuntimeHolder(std::shared_ptr<facebook::react::DevSettings> devSettings) noexcept {}

private:
  void initRuntime() noexcept;

  std::shared_ptr<facebook::jsi::Runtime> runtime_;

  std::once_flag once_flag_;
  std::thread::id own_thread_id_;

};

}}
