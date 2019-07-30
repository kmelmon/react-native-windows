#include "pch.h"

#include "HermesRuntimeHolder.h"

#include "hermes.h"

using namespace facebook;
using namespace facebook::react;

namespace react {
namespace uwp {

std::shared_ptr<facebook::jsi::Runtime> HermesRuntimeHolder::getRuntime() noexcept {
  std::call_once(once_flag_, [this]() { initRuntime(); });

  if (!runtime_) std::terminate();

  // Vanilla HermesRuntime is not thread safe. TODO :: Switch to thread safe one when needed.
  if (own_thread_id_ != std::this_thread::get_id()) std::terminate();

  return runtime_;
}

void HermesRuntimeHolder::initRuntime() noexcept {
  runtime_ = facebook::hermes::makeHermesRuntime();
  own_thread_id_ = std::this_thread::get_id();
}

}}
